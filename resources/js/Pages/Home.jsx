import { Link, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home({ posts }) {
    const pageData = usePage();
    console.log(usePage());
    useEffect(()=> {
          if (pageData.props.flash.message) {
            toast.success(pageData.props.flash.message);
          }
    },[]);
    return (
        <div>
            <h1>Posts</h1>
            <div className="container">
                <div className="row">
                    {posts.data.map((post) => (
                        <div className="col-md-4" key={post.id}>
                            <div className="card mb-4">
                                <div className="card-header">{post.title}</div>
                                <div className="card-body">{post.content}</div>
                                <Link href={`/post/edit/${post.id}`} className="btn btn-primary">
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                    {/* Paginatio  */}

                    <div className="col-md-12">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        href={posts.prev_page_url}
                                        aria-label="Previous"
                                    >
                                        <span aria-hidden="true">«</span>
                                    </Link>
                                </li>
                                {posts.links.map((link) => {
                                    if (Number(link.label)) {
                                        return (
                                            <li
                                                key={link.url}
                                                className={`page-item ${
                                                    link.active ? "active" : ""
                                                }`}
                                            >
                                                <Link
                                                    className="page-link"
                                                    href={link.url}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        );
                                    }
                                })}
                                <li className="page-item">
                                    <Link
                                        className="page-link"
                                        href={posts.next_page_url}
                                        aria-label="Next"
                                    >
                                        <span aria-hidden="true">»</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}
