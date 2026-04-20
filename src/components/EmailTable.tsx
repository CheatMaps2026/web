import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useNewsletterViewModel} from "../view-models/useNewsletterViewModel";
import "../view-styles/NewsletterViewStyle.css"

const columns: GridColDef[] = [
    // {field: "userId", headerName: "UserID", width: 180},
    {field: "address", headerName: "Email Address", width: 400},
]


type props = {
    viewModel: ReturnType<typeof useNewsletterViewModel>
}


export const EmailTable = ({viewModel}: props) => {
    const {emails, selector, selectionModel} = viewModel


    return (
        <div className={'newsletter-view-grid'}>
            {emails ? <DataGrid
                checkboxSelection={true}
                autoHeight={true}
                columns={columns}
                rows={emails}
                getRowId={(row) => row.userId}
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
            /> : null}
        </div>
    )

}
