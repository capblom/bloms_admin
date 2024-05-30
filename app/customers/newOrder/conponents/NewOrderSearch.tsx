export default function NewOrderSearch() {
    return (
        <div>

            <div className="pb-2">
                <p>To start, please enter an email address below. If you do not have an email address, you can enter a postcode instead.</p>
            </div>

            <form className="grid grid-cols-6 mt-2">

                <div className='col-span-1 flex items-center mb-2'>
                    <label>EMAIL ADDRESS</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>POSTCODE</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className="col-span-6">
                    <button className="w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/8 bg-darkpurple text-white font-medium py-2 px-4 mt-4 mb-2 mr-2 rounded-sm hover:bg-lightpurple" type="submit">SEARCH</button>
                </div>

                <div className="col-span-6">
                    <h5>or</h5>
                </div>

                <div className="col-span-6">
                    <button className="w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/8 bg-darkpurple text-white font-medium py-2 px-4 mt-4 mb-2 mr-2 rounded-sm hover:bg-lightpurple" type="submit">ADD CUSTOMER</button>
                </div>

            </form>
        </div>
    )
}