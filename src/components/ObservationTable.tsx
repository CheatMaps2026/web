import {ExportType, useObservationTableViewModel} from "../view-models/useObservationTableViewModel";
import {DataGrid, GridColDef} from '@mui/x-data-grid';


const columns: GridColDef[] = [
    {field: "observationId", headerName: "observationID", width: 180},
    {field: "userId", headerName: "userID", width: 150},
    {
        field: "latitude",
        headerName: "Lat",
        width: 120,
        valueGetter: (_, row) => row.position.gpsOrigin.latitude,
    },
    {
        field: "longitude",
        headerName: "Lng",
        width: 120,
        valueGetter: (_, row) => row.position.gpsOrigin.longitude,
    },
    {
        field: "percentCoverage",
        headerName: "% Coverage", width: 130
    },
    {
        field: "verificationRating",
        headerName: "Rating", width: 110
    },
    {
        field: "estimatedArea",
        headerName: "Area (square meters)",
        width: 130,
        valueGetter: (_, row) => {
            if (row.estimatedArea === 0) {
                return "N/A"
            }
            return row.estimatedArea
        }
    },
    {
        field: "timestamp",
        headerName: "Date made",
        width: 180,
        valueGetter: (_, row) => new Date(row.timestamp)
    },
    {field: "notes", headerName: "Notes", flex: 1}
]

const verificationRatingOptions = [
    {value: "", label: "No filter"},
    {value: "0", label: "Unverified"},
    {value: "1", label: "Not cheatgrass"},
    {value: "2", label: "Cheatgrass"},
    {value: "3", label: "Maybe cheatgrass"},
]

const estimatedAreaOptions = [
    {value: "", label: "No filter"},
    {value: "1", label: "1 square meter"},
    {value: "5", label: "5 square meters"},
    {value: "10", label: "10 square meters"},
    {value: "15", label: "15 square meters"},
    {value: "25", label: "25 square meters"},
    {value: "30", label: "Greater than 25 square meters"},

]

const percentCoverageOptions = [
    {value: "", label: "No filter"},
    {value: "5", label: "0-5%"},
    {value: "15", label: "5-15%"},
    {value: "25", label: "15-25%"},
    {value: "50", label: "25-50%"},
    {value: "100", label: "More than 50%"},
]

const observationTypeOptions = [
    {value: "ALL", label: "All"},
    {value: "POINT", label: "Point"},
    {value: "POLYGON", label: "Polygon"},
]


const exportOptions = [
    {value: "CSV", label: "CSV"},
    {value: "GEOJSON", label: "GEOJSON"},
]

type props = {
    viewModel: ReturnType<typeof useObservationTableViewModel>
}

export const ObservationTable = ({viewModel}: props) => {
    const {
        modifiedObservations,
        filterFormSubmit,
        selectionModel,
        selector,
        selectedObservations,
        exportData,
        setSelectedFormat
    } = viewModel


    return (
        <div className={"observation-table"}>
            {modifiedObservations ?
                <div className={"filter-bar"}>
                    <form id={"filterForm"} onSubmit={filterFormSubmit}>
                        <div className={"filter-option"}>
                            <label htmlFor={"start"}>Start</label>
                            <input type="date" id={"start"} name={"start"}/>
                            <label htmlFor={"end"}>End</label>
                            <input type="date" id={"end"} name={"end"}/>
                        </div>
                        <div className={"filter-option"}>
                            <label htmlFor={"verification-status"}>Verification Rating</label>
                            <select className={"form-select"} id={"verification-status"} name={"verificationStatus"}>
                                {verificationRatingOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"filter-option"}>
                            <label htmlFor={"estimated-area"}>Estimated Area</label>
                            <select className={"form-select"} id={"estimated-area"} name={"estimatedArea"}>
                                {estimatedAreaOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={"filter-option"}>
                            <label htmlFor={"percent-coverage"}>Percent Coverage</label>
                            <select className={"form-select"} id={"percent-coverage"} name={"percentCoverage"}>
                                {percentCoverageOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className={"filter-option"}>
                            <label htmlFor={"estimated-area"}>Observation Type</label>
                            <select className={"form-select"} id={"observation-type"} name={"observationType"}>
                                {observationTypeOptions.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                    <button type={"submit"} form={"filterForm"}>
                        Apply filter
                    </button>

                    <div className={"export-drop-down-container"}>
                        <label htmlFor={"export"}>Export format</label>
                        <select className={"export-drop-down"} name={"export"}
                                onChange={(event) => setSelectedFormat(event.currentTarget.value as ExportType)}>
                            {exportOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    <button type={"submit"} onClick={exportData}
                            disabled={selectedObservations.length == 0}>
                        {selectedObservations.length === 0 ? "No observations selected" : "Export"}
                    </button>

                </div> :
                <div><h1>Loading...</h1></div>}

            {modifiedObservations &&
                <DataGrid
                    checkboxSelection={true}
                    autoHeight={true}
                    rows={modifiedObservations}
                    columns={columns}
                    getRowId={(row) => row.observationId}
                    pageSizeOptions={[{value: 10, label: "10 rows"},
                        {value: 25, label: "25 rows"},
                        {value: 100, label: "100 rows"}]}
                    initialState={{
                        pagination: {paginationModel: {pageSize: 10}},
                    }}
                    rowSelectionModel={selectionModel}
                    onRowSelectionModelChange={(model) => {
                        console.log(model)
                        selector(model)
                    }}
                />}

        </div>)
}
