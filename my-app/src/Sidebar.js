function Sidebar({ setPage, handleLogout }) {
    return (
        <div
            style={{
                width: "200px",
                height: "100vh",
                backgroundColor: "#212529",
                color: "white",
                padding: "20px",
                position: "fixed",
                left: 0,
                top: 0,
            }}
        >
            <h3>MENU</h3>

            <hr />

            <button
                className="btn btn-light w-100 mb-2"
                onClick={() => setPage("crud")}
            >
                CRUD
            </button>

            <button
                className="btn btn-light w-100 mb-2"
                onClick={() => setPage("test1")}
            >
                TEST1
            </button>

            <button
                className="btn btn-light w-100 mb-2"
                onClick={() => setPage("test2")}
            >
                TEST2
            </button>

            <button
                className="btn btn-danger w-100 mt-3"
                onClick={handleLogout}
            >
                LOGOUT
            </button>
        </div>
    );
}

export default Sidebar;