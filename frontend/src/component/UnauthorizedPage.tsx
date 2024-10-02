import { useNavigate } from "react-router-dom";

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className=" p-8 rounded-lg  text-center">
                <h1 className="text-5xl font-bold text-red-700 mb-4">403</h1>
                <h2 className="text-2xl font-semibold mb-2">Unauthorized Access</h2>
                <p className="text-gray-600 mb-6">Sorry, you don't have permission to view this page.</p>

                <button
                    onClick={handleGoBack}
                    className="px-4 py-2 bg-[#002A47] text-white rounded-md transition-colors duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
