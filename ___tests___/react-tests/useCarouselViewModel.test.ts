import {ReactNode} from "react";
import {Observation} from "../../src/model/observations";
import {render, renderHook, act} from "@testing-library/react";
import {useObservationStoreContext} from "../../src/providers/ObservationsStoreProvider";
import {useCarouselViewModel} from "../../src/view-models/useCarouselViewModel";
import {useVerificationFunctions} from "../../src/view-models/useVerificationFunctions";

jest.mock("../../src/providers/ObservationsStoreProvider", () => ({
    ObservationsStoreProvider: ({children}: { children: ReactNode }) => children,
    useObservationStoreContext: jest.fn(),
}));

jest.mock("../../src/providers/ApiClientProvider", () => ({
    ApiClientProvider: ({children}: { children: React.ReactNode }) => children,
    useApiClient: jest.fn(() => ({
        get: jest.fn(),
        post: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
    })),
}));

jest.mock("../../src/view-models/useVerificationFunctions", () => {
    useVerificationFunctions: jest.fn()
})


export const makeFakeObservation = (index: number): Observation => ({
    observationId: `observation-${index}`,
    userId: `user-${index % 5}`,
    timestamp: new Date().getTime(),
    verificationRating: index % 4, // 0, 1, 2, 3
    percentCoverage: (index * 7) % 100,
    estimatedArea: 10 + index * 3,
    notes: `Fake observation note ${index}`,
    image: `https://example.com/image-${index}.jpg`,
    position: {
        coordinates: [
            {
                latitude: 38.5 + index * 0.001,
                longitude: -106.9 - index * 0.001,
            },
        ],
        gpsOrigin: {
            latitude: 38.5 + index * 0.001,
            longitude: -106.9 - index * 0.001,
            heading: 90,
            accuracy: 5,
        },
    },
});
const makeObservations = () => {
    const observations = []
    for (let index = 0; index < 100; index++) {
        observations.push(makeFakeObservation(index));
    }
    return observations;
}

const mockedUseVerificationFunctions = useVerificationFunctions as jest.MockedFunction<
    typeof useVerificationFunctions
>;

const mockedUseObservationStoreContext = useObservationStoreContext as jest.MockedFunction<
    typeof useObservationStoreContext
>;

const mockLabelNotCheatgrass = jest.fn();
const mockLabelMaybeCheatgrass = jest.fn();
const mockLabelYesCheatgrass = jest.fn();


describe("useCarouselViewModel", () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    beforeEach(() => {
        mockedUseVerificationFunctions.mockReturnValue({
            labelNotCheatgrass: mockLabelNotCheatgrass,
            labelMaybeCheatgrass: mockLabelMaybeCheatgrass,
            labelYesCheatgrass: mockLabelYesCheatgrass,
        });
    });

    beforeEach(() => {
        mockedUseObservationStoreContext.mockReturnValue({
            observations: makeObservations(),
            loading: false,
            error: null,
        });
    });

    test("Unverified observations takes precedence over filteredObservations", async () => {
        const {result} = renderHook(() => useCarouselViewModel())
        expect(result.current.currentObservations.length).toBe(25); //out of 100 observations, there are 25 unfiltered. Current should equal unfiltered
    })

    test("Verifying observations removes them from unverifiedObservations", async () => {
        const {result} = renderHook(() => useCarouselViewModel())

        await act(async () => {
            await result.current.verifyActiveObservation(mockLabelNotCheatgrass)
            expect(result.current.currentObservations.length).toBe(24)
        })
    })
})
