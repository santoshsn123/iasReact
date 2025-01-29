import { useForm } from "react-hook-form";
import { Test } from "../../../interfaces/tests";
import { createTest, getSingleTest, updateTest } from "../../../services/test.services";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";


const AddTests = () => {
    const navigate = useNavigate();
    const [extistingTest, setExistingTest] = useState<Test | null>();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Test>();
    let { id } = useParams();

    useEffect(() => {
        if (id) getOneTest(parseInt(id))
    }, []);

    const getOneTest = async (id: number) => {
        const { data }: AxiosResponse<any, any> = await getSingleTest(id);
        setExistingTest(data);
    }
    // Handle form submission
    const onSubmit = async (data: any) => {
        // Call your API to submit data (example using fetch)
        try {
            id ? await updateTest(parseInt(id || ''), data) : await createTest(data);
            navigate('/admin/tests');
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        }
    };

    useEffect(() => {
        if (extistingTest) {
            const { title, duration, positiveMarks, negativeMarks, description }: Test = extistingTest;
            setValue('title', title);
            setValue('duration', duration);
            setValue('positiveMarks', positiveMarks);
            setValue('negativeMarks', negativeMarks);
            setValue('description', description);
        }
    }, [extistingTest, setValue]);
    return (
        <div className="container-fluid p-4">
            <h2>Add New Test</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Test Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Test Title</label>
                    <input
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        id="title"
                        {...register('title', { required: 'Test Title is required' })}
                        defaultValue={extistingTest?.title}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                {/* Test Duration */}
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Test Duration (in minutes)</label>
                    <input
                        type="number"
                        className={`form-control ${errors.duration ? 'is-invalid' : ''}`}
                        id="duration"
                        {...register('duration', { required: 'Test Duration is required' })}
                        defaultValue={extistingTest?.duration}
                    />
                    {errors.duration && <div className="invalid-feedback">{errors.duration.message}</div>}
                </div>

                {/* Test Positive Marks */}
                <div className="mb-3">
                    <label htmlFor="positiveMarks" className="form-label">Test Positive Marks</label>
                    <input
                        type="number"
                        className={`form-control ${errors.positiveMarks ? 'is-invalid' : ''}`}
                        id="positiveMarks"
                        {...register('positiveMarks', { required: 'Test Positive Marks are required' })}
                        defaultValue={extistingTest?.positiveMarks}
                    />
                    {errors.positiveMarks && <div className="invalid-feedback">{errors.positiveMarks.message}</div>}
                </div>

                {/* Test Negative Marks */}
                <div className="mb-3">
                    <label htmlFor="negativeMarks" className="form-label">Test Negative Marks</label>
                    <input
                        type="number"
                        className={`form-control ${errors.negativeMarks ? 'is-invalid' : ''}`}
                        id="negativeMarks"
                        {...register('negativeMarks', { required: 'Test Negative Marks are required' })}
                        defaultValue={extistingTest?.negativeMarks}
                    />
                    {errors.negativeMarks && <div className="invalid-feedback">{errors.negativeMarks.message}</div>}
                </div>
                {/* Test Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Test Descrription</label>
                    <textarea
                        className={`form-control `}
                        id="description"
                        {...register('description')}
                        defaultValue={extistingTest?.description}
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddTests
