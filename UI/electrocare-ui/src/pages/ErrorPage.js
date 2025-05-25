import { useParams } from "react-router-dom"

export const ErrorPage = () => {
    const{error} = useParams()
    return(<>
        <div className="alert alert-danger">
            {(error===401)?
                (<h1 className="text-center">Error due to {error} Unauthorised</h1>):
                (error === 500)?
                (<h1 className="text-center">Error due to {error} Unauthorised</h1>):
                (<h1 className="text-center">Error</h1>)
            }
        </div>
    </>)
}