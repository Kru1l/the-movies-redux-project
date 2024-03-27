import {Button, Spinner} from "react-bootstrap";

const LoadingPage = () => {

    return (
        <div>
            <Button variant="dark" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </div>
    );
};

export {LoadingPage};