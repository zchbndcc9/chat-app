import { signIn } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat App | Login",
};

export default async function LoginPage() {
	return (
		<main>
			<div className="card card-xl">
				<div className="card-title">
					Login
				</div>
				<div className="card-body">
					<form action={async () => {
							'use server';

							await signIn('github');
					}}>
						<button className="btn btn-primary">
							Sign In With Github
						</button>
					</form>
				</div>
			</div>
		</main>
	)
}
