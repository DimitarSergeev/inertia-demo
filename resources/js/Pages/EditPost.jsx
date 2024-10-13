import { Head, useForm } from "@inertiajs/react";
export default function EditPost({ postData }) {

    const { data, setData, post, processing, errors } = useForm({
        title: postData.title,
        content: postData.content,
    });

    const handleChange = (e) => {
       const { name, value } = e.target;
        setData(name, value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/post/edit/${postData.id}`);
    }
    return (
        <>
            <Head>
                <title>Edit Posts</title>
                <meta
                    head-key="description"
                    name="description"
                    content="my awesome site is with ssr"
                />
            </Head>
            <div>
                <h1>Create Post</h1>
                <div className="container">
                    <div className="row">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    value={data.title}
                                    type="text"
                                    onChange={handleChange}
                                    name="title"
                                    className="form-control"
                                    id="title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    className="form-control"
                                    id="content"
                                    name="content"
                                    onChange={handleChange}
                                    value={data.content}
                                ></textarea>
                            </div>
                            <button
                                disabled={processing}
                                type="submit"
                                className="btn btn-primary mt-4"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
