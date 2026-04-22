const CameraModal = ()=>{
    return(
        <div className="fixed inset-0 flex justify-center items-center">
            <video ></video>
            <canvas></canvas>
            <img/>
            <button className="bg-white rounded-full "></button>
        </div>
    )
}
export default CameraModal;