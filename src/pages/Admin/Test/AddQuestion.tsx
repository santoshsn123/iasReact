import { useFieldArray, useForm } from "react-hook-form";
import { Question } from "../../../interfaces/tests";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { createQuestion } from "../../../services/question.services";


const AddQuestion = () => {
    const navigate = useNavigate();
    const [extistingTest, setExistingTest] = useState<Question | null>();
    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Question>();
    const { id } = useParams();
    const tId = parseInt(id || '');

    // useEffect(() => {
    //     if (id) getOneTest(parseInt(id))
    // }, []);

    // const getOneTest = async (id: number) => {
    //     const { data }: AxiosResponse<any, any> = await getSingleTest(id);
    //     setExistingTest(data);
    // }
    // Handle form submission
    const onSubmit = async (data: any) => {
        // Call your API to submit data (example using fetch)
        console.log(data);
        try {
            // id ? await updateTest(parseInt(id || ''), data) : await createTest(data);
            await createQuestion({...data,tId});
            navigate(`/admin/tests/questions/${tId}`);
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error submitting the form.');
        }
    };

      // Use useFieldArray to dynamically handle options
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options", // Name of the field in the form data
  });

    // useEffect(() => {
    //     if (extistingTest) {
    //         const { title, duration, positiveMarks, negativeMarks, description }: Question = extistingTest;
    //         setValue('title', title);
    //         setValue('duration', duration);
    //         setValue('positiveMarks', positiveMarks);
    //         setValue('negativeMarks', negativeMarks);
    //         setValue('description', description);
    //     }
    // }, [extistingTest, setValue]);
    return (
        <div className="container-fluid p-4">
            <h2>Add New Question</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Test Title */}
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">Question</label>
                    <input
                        type="text"
                        className={`form-control ${errors.question ? 'is-invalid' : ''}`}
                        id="question"
                        {...register('question', { required: 'Test question is required' })}
                    />
                    {errors.question && <div className="invalid-feedback">{errors.question.message}</div>}
                </div>

                {/* Question Answer */}
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Answer</label>
                    <input
                        type="text"
                        className={`form-control ${errors.answer ? 'is-invalid' : ''}`}
                        id="answer"
                        {...register('answer', { required: 'Test answer is required' })}
                        defaultValue={extistingTest?.answer}
                    />
                    {errors.answer && <div className="invalid-feedback">{errors.answer.message}</div>}
                </div>
                {/* Test Description */}
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className={`form-control `}
                        id="description"
                        {...register('description')}
                        defaultValue={extistingTest?.description}
                    ></textarea>
                </div>

                <div className="mb-3">
        {/* <label htmlFor="description" className="form-label">Add New</label> */}
        <button
          type="button"
          className="btn btn-success"
          onClick={() => append({ option: "" })} // Adds a new empty option field
        >
          Add Option
        </button>
      </div>

                {/* Question Options */}
      {fields.map((item, index) => (
        <div className="mb-3" key={item.id}>
          <label htmlFor={`options[${index}].option`} className="form-label">Option {index + 1}</label>
          <div className="row">
            <div className="col-md-10">
              <input
                type="text"
                className={`form-control ${errors.options ? 'is-invalid' : ''}`}
                id={`options[${index}].option`}
                {...register(`options[${index}].option`, { required: 'Test option is required' })}
              />
              {/* {errors?.options?.[index]?.option && (
                <div className="invalid-feedback">{errors.options[index].option.message}</div>
              )} */}
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => remove(index)} // Removes the option field
              >
                X
              </button>
            </div>
          </div>
        </div>
      ))}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default AddQuestion
