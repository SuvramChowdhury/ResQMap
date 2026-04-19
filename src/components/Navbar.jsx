const Navbar=()=>{
    return(
      <div className="flex justify-start gap-5 items-center p-5 bg-gray-900 text-white text-2xl">
        <img src="./src/assets/alarm.png" alt="image" className="h-10 w-10" />
        <h3>All</h3>
        <h3>Fire</h3>
        <h3>Flood</h3>
        <h3>Accident</h3>
      </div>
    )
}
export default Navbar;