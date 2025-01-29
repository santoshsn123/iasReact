import  { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TestSeries } from '../../../interfaces/tests';
import { AxiosResponse } from 'axios';
import { createTestSeries, getSingleTestSeries, updateTestSeries } from '../../../services/testSeries.services';

const AddTestSeries = () => {
    const navigate = useNavigate();
    const [extistingTestSeries, setExistingTest] = useState<TestSeries | null>();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<TestSeries>();
    const { id } = useParams();

    useEffect(() => {
        if (id) getOneTest(parseInt(id))
    }, []);

    const getOneTest = async (id: number) => {
        const { data }: AxiosResponse<any, any> = await getSingleTestSeries(id);
        setExistingTest(data);
    }
    // Handle form submission
    const onSubmit = async (data: any) => {
        // Call your API to submit data (example using fetch)
        try {
            id ? await updateTestSeries(parseInt(id || ''), data) : await createTestSeries(data);
            navigate('/admin/test-series');
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        }
    };

    useEffect(() => {
        if (extistingTestSeries) {
            const { title, price,tests,  description }: TestSeries = extistingTestSeries;
            setValue('title', title);
            setValue('price', price);
            setValue('tests', tests);
            setValue('description', description);
        }
    }, [extistingTestSeries, setValue]);
    return (
        <div className="container-fluid p-4">
            <h2>Add New Test Series</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Test Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Test Series Title</label>
                    <input
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        id="title"
                        {...register('title', { required: 'Test Series Title is required' })}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                {/* Test Duration */}
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Test Series Pries (in Rs)</label>
                    <input
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        id="price"
                        {...register('price', { required: 'Test price is required' })}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
                </div>

               
                {/* Test Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Test Descrription</label>
                    <textarea
                        className={`form-control `}
                        id="description"
                        {...register('description')}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="tests" className="form-label">Tests</label>
                    <input
                        type="text"
                        className={`form-control ${errors.tests ? 'is-invalid' : ''}`}
                        id="tests"
                        {...register('tests', { required: 'Test tests is required' })}
                    />
                    {errors.tests && <div className="invalid-feedback">{errors.tests.message}</div>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddTestSeries
