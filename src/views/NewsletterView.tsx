import "../view-styles/NewsletterViewStyle.css"
import {useNewsletterViewModel} from "../view-models/useNewsletterViewModel";
import {EmailTable} from "../components/EmailTable";

export const NewsletterView = () => {
    const viewModel = useNewsletterViewModel()


    return (<div className={'newsletter-view-root'}>
        {viewModel.error ? (
            <div className={'newsletter-error-message'}><p>{viewModel.error.message}</p></div>
        ) : (
            <div className={'newsletter-view-grid-container'}>
                <EmailTable viewModel={viewModel}/>
            </div>
        )}

    </div>)
}
