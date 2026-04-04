import {useEffect, useState} from "react";
import {Email} from "../model/emails";
import {useApiClient} from "../providers/ApiClientProvider";
import {GridRowSelectionModel} from "@mui/x-data-grid";


const mockEmails: Email[] = [
    {userId: "testuser123", address: "user@gmail.com"},
    {userId: "testuser456", address: "example@gmail.com"},
    {userId: "testuser789", address: "example2@gmail.com"},
    {userId: "testuser101", address: "example3@gmail.com"},
    {userId: "testuser102", address: "example4@gmail.com"}
]

export type NewsletterError = {
    message: string;
}


export const useNewsletterViewModel = () => {
    const [emails, setEmails] = useState<Email[]>([]);
    const [selectedEmails, setSelectedEmails] = useState<Email[]>([]);
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
                // const emails = await apiClient.get('/email')
                // console.log("Emails from api")

                setSelectedEmails(mockEmails)
            } catch (error) {
                setError(error as any);
            } finally {
                setLoading(false);
            }
        }
        loadEmails()
    }, [])

    const selector = (model: GridRowSelectionModel) => {
        setSelectionModel(model);
    }

    return {
        selector,
        setSelectionModel,
        selectionModel,
        setSelectedEmails,
        selectedEmails,
        emails,
        loading,
        error,
    }

}
