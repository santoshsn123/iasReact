import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteQuestion, getAllQuestions } from '../../../services/question.services';
import { Question } from '../../../interfaces/tests';
import { AxiosResponse } from 'axios';

const Questions = () => {
    const { id } = useParams();
    const qId = parseInt(id || '');
    const [questions, setQuestions] = useState<Question[]>();
    useEffect(() => {
        getQuestions();
    }, [])
    const getQuestions = async () => {
        try {
            const { data }: AxiosResponse = await getAllQuestions(qId);
            console.log(data);
            setQuestions(data);
        }
        catch (err) {
            console.warn(err)
        }
    }
    const deleteHandler = async (id: number | undefined) => {
        if (confirm("Do you really want to delete this record?")) {
            if (id) {
                await deleteQuestion(id)
                getQuestions();
            }
        }
    }
    return (
        <div className="container-fluid p-4">
            <h2>Questions</h2>
            <p>You can List Questions Here.</p>
            <Link className="btn btn-primary btn-sm mb-3" to="new">Add New</Link>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Question</th>
                        <th scope="col">Answer</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions?.map((question: Question, index: number) => <tr>
                        <th scope="row">{++index}</th>
                        <td>{question.question}</td>
                        <td>{question.answer}</td>
                        <td>{question.description}</td>
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteHandler(question.id)}>Delete</button>
                        </td>
                    </tr>)}

                </tbody>
            </table>

        </div>
    )
}

export default Questions
