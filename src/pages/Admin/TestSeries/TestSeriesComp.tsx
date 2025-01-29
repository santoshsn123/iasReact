import { useEffect, useState } from 'react'
import { TestSeries } from '../../../interfaces/tests';
import { AxiosResponse } from 'axios';
import { deleteTestSeries, getAllTestSeries } from '../../../services/testSeries.services';
import { Link } from 'react-router-dom';

const TestSeriesComp = () => {
    const [testSerie, setTestSeries] = useState<TestSeries[]>([]);
    useEffect(() => {
        getTests()
    }, []);

    const getTests = async () => {
        try {
            const { data: test }: AxiosResponse = await getAllTestSeries();
            setTestSeries(test);
            //    setTests(tests);
        } catch (err) {
            console.warn(err);
        }
    }

    const deleteHandler = async (id: number | undefined) => {
        if (confirm('Do you want to delte this record?')) {
            id ? await deleteTestSeries(id) : '';
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
                        <th scope="col">Price</th>
                        <th scope="col">Description</th>
                        <th scope="col">Tests</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testSerie.map((test: TestSeries,index:number) => <tr>
                        <th scope="row">{++index}</th>
                        <td>{test.title}</td>
                        <td>{test.price}</td>
                        <td>{test.description}</td>
                        <td>{test.tests}</td>
                        <td>
                            <Link className="btn btn-primary btn-sm" to={`update/${test.id}`}>Edit</Link>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(test.id)}>Delete</button>
                        </td>
                    </tr>)}

                </tbody>
            </table>

        </div>
    )
}

export default TestSeriesComp
