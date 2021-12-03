import Tour from "../Tour"
const Tours = ({tours, removeTour}) => {
    return (
        <section className="">
            <div className="title">
                <h2>Our tours</h2>
                <div className="underline"></div>
            </div>
            <div>
                {tours.map(tour =>
                    <Tour key={tour.id} {...tour} removeTour={removeTour} />    
                )}
            </div>
        </section>
    )
}
export default Tours