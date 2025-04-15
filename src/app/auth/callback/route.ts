import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get('code');
	const next = searchParams.get('next') ?? '/'

	console.log('code', code);

	if (code) {
		const supabase = await createClient();
		const { error, data } = await supabase.auth.exchangeCodeForSession(code);

		console.log('in server', error, data)

		if (!error) {
			const forwardedHost = request.headers.get('x-forwarded-host');
			const isLocalEnv = process.env.NODE_ENV === 'development';

			if (isLocalEnv) {
				return NextResponse.redirect(origin.concat(next))
			} else if (forwardedHost) {
				return NextResponse.redirect(forwardedHost.concat(next));
			} else {
				return NextResponse.redirect(origin.concat(next));
			}
		}
	}

	return NextResponse.redirect(origin.concat('/auth/auth-code-error'));
}
