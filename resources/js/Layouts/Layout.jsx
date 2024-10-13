import { Link } from "@inertiajs/react";

export default function Layout({ children }) {
    return (
        <>
            <nav class="first">
                <h1 class="fheading">ABCD</h1>
                <ul class="flist">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/create/post">Create</Link>
                    </li>
                    <li>
                        <Link href="/edit/1">Edit</Link>
                    </li>
                </ul>
            </nav>

            <main>{children}</main>
            {/* <footer>
                <h1>Footer</h1>
            </footer> */}
        </>
    );
}
