import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		user: {
			firstName: locals.user?.firstName,
			lastName: locals.user?.lastName
		}
	}
};
