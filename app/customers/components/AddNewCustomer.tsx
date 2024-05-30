
export default function AddNewCustomer() {
    return (
        <div>

            <div className="pb-2">
                <p>To add a new customer, please enter their personal details below. When you are done, press create order.</p>
            </div>

            <h3 className="text-2xl text-lightpurple py-2">billing details</h3>

            <form className="grid grid-cols-6 mt-2">

                <div className='col-span-1 flex items-center mb-2'>
                    <label>TITLE</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>FIRST NAME</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>LAST NAME</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>EMAIL</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>TELEPHONE</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <h3 className="col-span-6 text-2xl text-lightpurple py-2">billing address</h3>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>ADDRESS SEARCH</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        id="billing_search_input"
                        name="billing_search_input"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>LINE 1</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        id="billing_line_1"
                        name="billing_line_1"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>LINE 2</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        id="billing_line_2"
                        name="billing_line_2"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>TOWN</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        id="billing_city"
                        name="billing_city"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>POSTCODE</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        id="billing_postcode"
                        name="billing_postcode"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className='col-span-1 flex items-center mb-2'>
                    <label>COUNTRY</label>
                </div>

                <div className='col-span-5 flex-items-center ml-4 mb-2'>
                    <input
                        type="text"
                        id="billing_country"
                        name="billing_country"
                        className="p-2 rounded-sm shadow-md border focus:outline-none focus:ring-2 focus:ring-lightpurple"
                    />
                </div>

                <div className="col-span-6">
                    <button className="w-1/2 sm:w-1/4 md:w-1/6 lg:w-1/8 bg-darkpurple text-white font-medium py-2 px-4 mt-4 mb-2 mr-2 rounded-sm hover:bg-lightpurple" type="submit">CREATE ORDER</button>
                </div>

            </form>

            
        </div>
    )
}