import { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

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
							const supabase = await createClient();

							const { data, error } = await supabase.auth.signInWithOAuth({
								provider: 'github',
								options: {
									redirectTo: process.env.SUPABASE_AUTH_GITHUB_CALLBACK_URL
								}
						})

							if (error) console.error(error);

							if (data.url) redirect(data.url);
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
