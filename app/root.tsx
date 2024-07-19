import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { MetaFunction } from "@remix-run/node";
import Header from "./components/layout/header";
import Footer from "./components/layout/footer";

export const meta: MetaFunction = () => {
	return [
		{ title: "Simple Book App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow layout bg-page">{children}</main>
				<Footer />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
