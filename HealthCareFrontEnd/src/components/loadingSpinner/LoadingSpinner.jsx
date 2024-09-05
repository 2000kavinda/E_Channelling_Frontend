function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="w-32 h-32 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
    );
}

export default LoadingSpinner;
