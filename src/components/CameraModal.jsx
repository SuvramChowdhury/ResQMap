const CameraModal = ({onClick})=>{
    return(
        <div className="fixed inset-0 flex justify-center items-center">
            <video src=""></video>
            <canvas></canvas>
            <img src="" alt="" />
            <button className="bg-white rounded-full" onClick={onClick}></button>
        </div>
    )
}
export default CameraModal;