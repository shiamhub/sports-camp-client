

const Modal = ({ history }) => {
    console.log(history);

    return (
        <div>
            {/* <button className="btn" onClick={() => window.my_modal_4.showModal()}>open modal</button> */}
            <dialog id="my_modal_4" className="modal">
                <form method="dialog" className="modal-box w-11/12 max-w-4xl">
                    <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="card lg:card-side shadow-xl">
                        <figure><img className="w-[500px]" src={history?.image} alt="Album" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{history?.className}</h2>
                            <p>Instructor name: {history?.instructorName}</p>
                            <p>Instructor Email: {history?.instructorEmail}</p>
                            <p>Available seats: {history?.availableSeats}</p>
                            <p>Price: {history?.price}</p>

                        </div>
                    </div>
                </form>
            </dialog>

        </div>
    );
};

export default Modal;