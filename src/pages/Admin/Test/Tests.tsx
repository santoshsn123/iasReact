import { useEffect, useState } from "react";
import { deleteTest, getAllTests } from "../../../services/test.services";
import { Link } from "react-router-dom";
import { Test } from "../../../interfaces/tests";
import { AxiosResponse } from "axios";

const Tests = () => {
    const [tests, setTests] = useState<Test[]>([]);
    useEffect(() => {
        getTests()
    }, []);

    const getTests = async () => {
        try {
            const { data: test }: AxiosResponse = await getAllTests();
            setTests(test);
            //    setTests(tests);
        } catch (err) {
            console.warn(err);
        }
    }

    const deleteHandler = async (id: number | undefined) => {
        if (confirm('Do you want to delte this record?')) {
            id ? await deleteTest(id) : '';
            getTests();
        }
    }
    return (
        <div className="container-fluid p-4">
            {/* Content goes here */}
            <h2>Test Management</h2>
            <p>Here you can manage the settings, users, products, and more.</p>
            <Link className="btn btn-primary btn-sm mb-3" to="new">Add New</Link>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Positive Marks</th>
                        <th scope="col">Negative Marks</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test: Test,index:number) => <tr>
                        <th scope="row">{++index}</th>
                        <td>{test.title}</td>
                        <td>{test.duration}</td>
                        <td>{test.positiveMarks}</td>
                        <td>{test.negativeMarks}</td>
                        <td>
                            <Link className="btn btn-primary btn-sm" to={`update/${test.id}`}>Edit</Link>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(test.id)}>Delete</button>
                            <Link className="btn btn-primary btn-sm" to={`questions/${test.id}`}>Add Questions</Link>
                        </td>
                    </tr>)}

                </tbody>
            </table>

        </div>
    )
}

export default Tests
