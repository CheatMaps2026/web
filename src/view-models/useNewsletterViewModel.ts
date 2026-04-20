import {useEffect, useMemo, useState} from "react";
import {Email} from "../model/emails";
import {useApiClient} from "../providers/ApiClientProvider";
import {GridRowSelectionModel} from "@mui/x-data-grid";
import {EmailCSVExportStrategy} from "../services/EmailCSVExportStrategy";


const mockEmails: Email[] = [
    {userId: "testuser001", address: "user001@gmail.com"},
    {userId: "testuser002", address: "user002@gmail.com"},
    {userId: "testuser003", address: "user003@gmail.com"},
    {userId: "testuser004", address: "user004@gmail.com"},
    {userId: "testuser005", address: "user005@gmail.com"},
    {userId: "testuser006", address: "user006@gmail.com"},
    {userId: "testuser007", address: "user007@gmail.com"},
    {userId: "testuser008", address: "user008@gmail.com"},
    {userId: "testuser009", address: "user009@gmail.com"},
    {userId: "testuser010", address: "user010@gmail.com"},
    {userId: "testuser011", address: "sample011@gmail.com"},
    {userId: "testuser012", address: "sample012@gmail.com"},
    {userId: "testuser013", address: "sample013@gmail.com"},
    {userId: "testuser014", address: "sample014@gmail.com"},
    {userId: "testuser015", address: "sample015@gmail.com"},
    {userId: "testuser016", address: "sample016@gmail.com"},
    {userId: "testuser017", address: "sample017@gmail.com"},
    {userId: "testuser018", address: "sample018@gmail.com"},
    {userId: "testuser019", address: "sample019@gmail.com"},
    {userId: "testuser020", address: "sample020@gmail.com"},
    {userId: "testuser021", address: "example021@gmail.com"},
    {userId: "testuser022", address: "example022@gmail.com"},
    {userId: "testuser023", address: "example023@gmail.com"},
    {userId: "testuser024", address: "example024@gmail.com"},
    {userId: "testuser025", address: "example025@gmail.com"},
    {userId: "testuser026", address: "example026@gmail.com"},
    {userId: "testuser027", address: "example027@gmail.com"},
    {userId: "testuser028", address: "example028@gmail.com"},
    {userId: "testuser029", address: "example029@gmail.com"},
    {userId: "testuser030", address: "example030@gmail.com"},
    {userId: "testuser031", address: "alpha031@gmail.com"},
    {userId: "testuser032", address: "alpha032@gmail.com"},
    {userId: "testuser033", address: "alpha033@gmail.com"},
    {userId: "testuser034", address: "alpha034@gmail.com"},
    {userId: "testuser035", address: "alpha035@gmail.com"},
    {userId: "testuser036", address: "alpha036@gmail.com"},
    {userId: "testuser037", address: "alpha037@gmail.com"},
    {userId: "testuser038", address: "alpha038@gmail.com"},
    {userId: "testuser039", address: "alpha039@gmail.com"},
    {userId: "testuser040", address: "alpha040@gmail.com"},
    {userId: "testuser041", address: "beta041@gmail.com"},
    {userId: "testuser042", address: "beta042@gmail.com"},
    {userId: "testuser043", address: "beta043@gmail.com"},
    {userId: "testuser044", address: "beta044@gmail.com"},
    {userId: "testuser045", address: "beta045@gmail.com"},
    {userId: "testuser046", address: "beta046@gmail.com"},
    {userId: "testuser047", address: "beta047@gmail.com"},
    {userId: "testuser048", address: "beta048@gmail.com"},
    {userId: "testuser049", address: "beta049@gmail.com"},
    {userId: "testuser050", address: "beta050@gmail.com"},
    {userId: "testuser051", address: "gamma051@gmail.com"},
    {userId: "testuser052", address: "gamma052@gmail.com"},
    {userId: "testuser053", address: "gamma053@gmail.com"},
    {userId: "testuser054", address: "gamma054@gmail.com"},
    {userId: "testuser055", address: "gamma055@gmail.com"},
    {userId: "testuser056", address: "gamma056@gmail.com"},
    {userId: "testuser057", address: "gamma057@gmail.com"},
    {userId: "testuser058", address: "gamma058@gmail.com"},
    {userId: "testuser059", address: "gamma059@gmail.com"},
    {userId: "testuser060", address: "gamma060@gmail.com"},
    {userId: "testuser061", address: "delta061@gmail.com"},
    {userId: "testuser062", address: "delta062@gmail.com"},
    {userId: "testuser063", address: "delta063@gmail.com"},
    {userId: "testuser064", address: "delta064@gmail.com"},
    {userId: "testuser065", address: "delta065@gmail.com"},
    {userId: "testuser066", address: "delta066@gmail.com"},
    {userId: "testuser067", address: "delta067@gmail.com"},
    {userId: "testuser068", address: "delta068@gmail.com"},
    {userId: "testuser069", address: "delta069@gmail.com"},
    {userId: "testuser070", address: "delta070@gmail.com"},
    {userId: "testuser071", address: "mock071@gmail.com"},
    {userId: "testuser072", address: "mock072@gmail.com"},
    {userId: "testuser073", address: "mock073@gmail.com"},
    {userId: "testuser074", address: "mock074@gmail.com"},
    {userId: "testuser075", address: "mock075@gmail.com"},
    {userId: "testuser076", address: "mock076@gmail.com"},
    {userId: "testuser077", address: "mock077@gmail.com"},
    {userId: "testuser078", address: "mock078@gmail.com"},
    {userId: "testuser079", address: "mock079@gmail.com"},
    {userId: "testuser080", address: "mock080@gmail.com"},
    {userId: "testuser081", address: "trial081@gmail.com"},
    {userId: "testuser082", address: "trial082@gmail.com"},
    {userId: "testuser083", address: "trial083@gmail.com"},
    {userId: "testuser084", address: "trial084@gmail.com"},
    {userId: "testuser085", address: "trial085@gmail.com"},
    {userId: "testuser086", address: "trial086@gmail.com"},
    {userId: "testuser087", address: "trial087@gmail.com"},
    {userId: "testuser088", address: "trial088@gmail.com"},
    {userId: "testuser089", address: "trial089@gmail.com"},
    {userId: "testuser090", address: "trial090@gmail.com"},
    {userId: "testuser091", address: "demo091@gmail.com"},
    {userId: "testuser092", address: "demo092@gmail.com"},
    {userId: "testuser093", address: "demo093@gmail.com"},
    {userId: "testuser094", address: "demo094@gmail.com"},
    {userId: "testuser095", address: "demo095@gmail.com"},
    {userId: "testuser096", address: "demo096@gmail.com"},
    {userId: "testuser097", address: "demo097@gmail.com"},
    {userId: "testuser098", address: "demo098@gmail.com"},
    {userId: "testuser099", address: "demo099@gmail.com"},
    {userId: "testuser100", address: "demo100@gmail.com"}
]

export type NewsletterError = {
    message: string;
}

export const useNewsletterViewModel = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<NewsletterError | null>(null);
    const apiClient = useApiClient();
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>({
        type: "include",
        ids: new Set()
    });

    useEffect(() => {
        const loadEmails = async () => {
            setLoading(true);
            try {
                const response: Email[] = await apiClient.get('/email')
                setEmails(response)
            } catch (error) {
                setError(error as any);
            } finally {
                setLoading(false);
            }
        }
        loadEmails()
    }, [])


    const selectedEmails = useMemo(() => {
        if (selectionModel.type === "include") {
            return emails.filter(email =>
                selectionModel.ids.has(email.userId)
            )

        } else {
            return emails.filter(email =>
                !selectionModel.ids.has(email.userId)
            )
        }
    }, [selectionModel, emails]);

    console.log(selectedEmails)

    const selector = (model: GridRowSelectionModel) => {
        setSelectionModel(model);
    }

    const exportSelection = async () => {
        console.log("exporting selected emails")
        if (selectedEmails.length === 0) return
        const exportStrategy = new EmailCSVExportStrategy(selectedEmails);
        const date = new Date();
        exportStrategy.download(`CheatMaps-Newsletter-${date.toISOString()}.csv`)
    }

    const exportAll = async () => {
        console.log("exporting all emails")
        if (emails.length === 0) return
        const exportStrategy = new EmailCSVExportStrategy(emails);
        const date = new Date();
        exportStrategy.download(`CheatMaps-Newsletter-${date.toISOString()}.csv`)
    }

    return {
        selector,
        exportAll,
        exportSelection,
        setSelectionModel,
        selectionModel,
        selectedEmails,
        emails,
        loading,
        error,
    }

}
