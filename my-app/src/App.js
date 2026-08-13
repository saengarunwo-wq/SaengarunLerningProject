import Axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [gender, setGender] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [nameError, setNameError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const addEmployee = () => {
    if (
      name.trim() === "" ||
      country.trim() === "" ||
      position.trim() === "" ||
      nameError ||
      countryError ||
      positionError
    ) {
      setShowModal(true);
      return;
    }

    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
      gender: gender,
      workingDays: workingDays,
      maritalStatus: maritalStatus,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
          gender: gender,
          workingDays: workingDays,
          maritalStatus: maritalStatus,
        },
      ]);
    });
  };

  const validateName = (value) => {
    setName(value);

    if (/\d/.test(value)) {
      setNameError("Name cannot contain numbers");
    } else {
      setNameError("");
    }
  };

  const validateCountry = (value) => {
    setCountry(value);

    if (/\d/.test(value)) {
      setCountryError("Country cannot contain numbers");
    } else {
      setCountryError("");
    }
  };

  const validatePosition = (value) => {
    setPosition(value);

    if (/\d/.test(value)) {
      setPositionError("Position cannot contain numbers");
    } else {
      setPositionError("");
    }
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          }),
        );
      },
    );
  };

  const deleteEmployeeWage = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        }),
      );
    });
  };

  const handleWorkingDays = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setWorkingDays([...workingDays, value]);
    } else {
      setWorkingDays(workingDays.filter((day) => day !== value));
    }
  };

  return (
    <div className="App container">
      <h1>Employee information</h1>
      <div className="information">
        <form action="">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className={`form-control ${nameError ? "is-invalid" : ""}`}
              placeholder="Enter name"
              onChange={(event) => {
                validateName(event.target.value);
              }}
            ></input>

            {nameError && <div className="text-danger mt-1"> {nameError} </div>}
          </div>

          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter ege"
              onChange={(event) => {
                setAge(event.target.value);
              }}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country:
            </label>
            <input
              type="text"
              className={`form-control ${countryError ? "is-invalid" : ""}`}
              placeholder="Enter country"
              onChange={(event) => {
                validateCountry(event.target.value);
              }}
            ></input>

            {countryError && (
              <div className="text-danger mt-1"> {countryError} </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position:
            </label>
            <input
              type="text"
              className={`form-control ${positionError ? "is-invalid" : ""}`}
              placeholder="Enter Position"
              onChange={(event) => {
                validatePosition(event.target.value);
              }}
            ></input>

            {positionError && (
              <div className="text-danger mt-1"> {positionError} </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="wage" className="form-label">
              Wage:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Wage"
              onChange={(event) => {
                setWage(event.target.value);
              }}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>

            <select
              className="form-select"
              onChange={(event) => {
                setGender(event.target.value);
              }}
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Working Days:</label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Monday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Monday</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Tuesday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Tuesday</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Wednesday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Wednesday</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Thursday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Thursday</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Friday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Friday</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Saturday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Saturday</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="Sunday"
                onChange={handleWorkingDays}
              />
              <label className="form-check-label">Sunday</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Marital Status:</label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                value="Single"
                onChange={(event) => {
                  setMaritalStatus(event.target.value);
                }}
              />
              <label className="form-check-label">Single</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                value="Married"
                onChange={(event) => {
                  setMaritalStatus(event.target.value);
                }}
              />
              <label className="form-check-label">Married</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="maritalStatus"
                value="Other"
                onChange={(event) => {
                  setMaritalStatus(event.target.value);
                }}
              />
              <label className="form-check-label">Other</label>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={addEmployee}
          >
            Add Employee
          </button>
        </form>
      </div>
      <hr />
      <div className="employee">
        <button className="btn btn-primary" onClick={getEmployees}>
          Show Employee
        </button>
        <br />
        <br />

        {employeeList.map((val, key) => {
          return (
            <div className="employee card">
              <div className="card-body text-left">
                <p className="card-text">Name: {val.name}</p>
                <p className="card-text">Age: {val.age}</p>
                <p className="card-text">Country: {val.country}</p>
                <p className="card-text">Position: {val.position}</p>
                <p className="card-text">Wage: {val.wage}</p>
                <p className="card-text">Gender: {val.gender}</p>
                <p className="card-text">WorkingDays: {val.workingDays}</p>
                <p className="card-text">MaritalStatus: {val.maritalStatus}</p>
                <div className="d-flex">
                  <input
                    type="text"
                    type="number"
                    style={{ width: "300px" }}
                    placeholder="15000..."
                    className="form-control"
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-waring"
                    onClick={() => {
                      updateEmployeeWage(val.id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteEmployeeWage(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <>
          <div
            className="modal fade show"
            style={{
              display: "block",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">Validation Error</h5>
                </div>

                <div className="modal-body">
                  Please correct the highlighted fields before adding an
                  employee.
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

//TEST1