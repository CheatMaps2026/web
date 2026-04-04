import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useNewsletterViewModel} from "../view-models/useNewsletterViewModel";
import "../view-styles/NewsletterViewStyle.css"

const columns: GridColDef[] = [
    // {field: "userId", headerName: "UserID", width: 180},
    {field: "address", headerName: "Email Address", width: 180},
]


type props = {
    viewModel: ReturnType<typeof useNewsletterViewModel>
}


export const EmailTable = ({viewModel}: props) => {
    const {selectedEmails, selector, selectionModel, setSelectedEmails, setSelectionModel} = viewModel

    return (
        <div className={'newsletter-view-grid'}>
            {selectedEmails ? <DataGrid
                checkboxSelection={true}
                autoHeight={true}
                columns={columns}
                rows={selectedEmails}
                getRowId={(row) => row.userId}
                pageSizeOptions={[{value: 10, label: "10 rows"},
                    {value: 25, label: "25 rows"},
                    {value: 100, label: "100 rows"}]}
                initialState={{
                    pagination: {paginationModel: {pageSize: 10}},
                }}
                rowSelectionModel={selectionModel}
                onRowSelectionModelChange={(model) => {
                    selector(model)
                }}
            /> : null}
        </div>
    )

}
