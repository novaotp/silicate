import { prisma } from '$services/db.js';
import { Router } from 'express';
import typia from 'typia';

/**
 * Routes are prefixed with /api/v1/memos
 */

export const v1 = Router();

v1.get<'/', Record<string, never>, unknown, unknown, { category?: string; search?: string }, Record<string, unknown>>(
    '/',
    async (req, res) => {
        try {
            const { category = '', search = '' } = req.query;

            const memos = await prisma.memo.findMany({
                select: {
                    id: true,
                    category: true,
                    title: true,
                    content: true,
                    isPinned: true,
                    updatedAt: true
                },
                where: {
                    creatorId: req.userId!,
                    // Only filter by category if it is not empty or undefined
                    ...(category !== '' && { category }),
                    // Only filter by search if it is not empty or undefined
                    ...(search !== '' && {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    })
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            });

            return res.success('Memos read successfully', memos);
        } catch (err) {
            console.error(`Something went wrong whilst fetching the memos : ${err.message}`);
            return res.serverError();
        }
    }
);

v1.get<'/:id(\\d+$)', { id: string }, unknown, unknown, Record<string, never>, Record<string, unknown>>(
    '/:id(\\d+$)',
    async (req, res) => {
        try {
            const memo = await prisma.memo.findFirst({
                select: {
                    id: true,
                    category: true,
                    title: true,
                    content: true,
                    isPinned: true,
                    updatedAt: true
                },
                where: {
                    id: req.params.id,
                    creatorId: req.userId!
                }
            });

            if (!memo) {
                return res.notFoundError("Memo with given id not found.")
            }

            return res.success('Memo read successfully', memo);
        } catch (err) {
            console.error(`Something went wrong whilst fetching the memo : ${err.message}`);
            return res.serverError();
        }
    }
);

interface MemoBody {
    category: string | null,
    title: string,
    content: string,
    isPinned: boolean
}

v1.post('/', async (req, res) => {
    try {
        const body = req.body;

        // Validate body.
        try {
            typia.assertGuardEquals<MemoBody>(body);
        } catch (error) {
            const typiaError = error as typia.TypeGuardError;
            return res.unprocessableEntityError(
                `Bad request on ${typiaError.path} : received ${typiaError.value}, expected ${typiaError.expected}`
            );
        }

        const memo = await prisma.memo.create({
            data: {
                creatorId: req.userId!,
                category: body.category,
                title: body.title,
                content: body.content,
                isPinned: body.isPinned
            },
            select: {
                id: true,
                category: true,
                title: true,
                content: true,
                isPinned: true,
                updatedAt: true
            },
        });

        return res.success("Memo created successfully", memo);
    } catch (err) {
        console.error(`Something went wrong whilst creating a memo : ${err.message}`);
        return res.serverError();
    }
});

v1.put<'/:id(\\d+$)', { id: string }, unknown, unknown, Record<string, never>, Record<string, unknown>>(
    '/:id(\\d+$)',
    async (req, res) => {
        try {
            const body = req.body;

            // Validate body.
            try {
                typia.assertGuardEquals<MemoBody>(body);
            } catch (error) {
                const typiaError = error as typia.TypeGuardError;
                return res.unprocessableEntityError(
                    `Bad request on ${typiaError.path} : received ${typiaError.value}, expected ${typiaError.expected}`
                );
            }

            const doesMemoExist = (await prisma.memo.findFirst({
                where: {
                    id: req.params.id,
                    creatorId: req.userId!
                }
            })) !== null;

            // Only update if the memo exists.
            if (!doesMemoExist) {
                return res.notFoundError("Memo with given id not found.")
            }

            const memo = await prisma.memo.update({
                data: {
                    category: body.category,
                    title: body.title,
                    content: body.content,
                    isPinned: body.isPinned
                },
                where: {
                    id: req.params.id,
                    creatorId: req.userId!
                },
                select: {
                    id: true,
                    category: true,
                    title: true,
                    content: true,
                    isPinned: true,
                    updatedAt: true
                },
            });

            return res.success("Memo updated successfully", memo);
        } catch (err) {
            console.error(`Something went wrong whilst updating a memo : ${err.message}`);
            return res.serverError();
        }
    }
);

v1.delete<'/:id(\\d+$)', { id: string }, unknown, unknown, Record<string, never>, Record<string, never>>(
    "/:id(\\d+$)",
    async (req, res) => {
        try {
            const doesMemoExist = (await prisma.memo.findFirst({
                where: {
                    id: req.params.id,
                    creatorId: req.userId!
                }
            })) !== null;

            // Only delete if the memo exists.
            if (!doesMemoExist) {
                return res.notFoundError("Memo with given id not found.")
            }

            await prisma.memo.delete({
                where: {
                    id: req.params.id,
                    creatorId: req.userId!
                }
            });
    
            return res.success("Memo deleted successfully");
        } catch (err) {
            console.error(`Something went wrong whilst deleting a memo : ${err.message}`);
            return res.serverError();
        }
    }
);

v1.get<"/categories", Record<string, never>, unknown, unknown, { search?: string }>("/categories", async (req, res) => {
    try {
        const { search = "" } = req.query;

        const categories = (await prisma.memo.findMany({
            select: {
                category: true
            },
            where: {
                category: {
                    not: null
                },
                ...(search && {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                })
            },
            orderBy: {
                category: {
                    sort: "asc"
                }
            },
            distinct: ['category']
        })).map(row => row.category);

        return res.success("Retrieved categories successfully", categories);
    } catch (err) {
        console.error(`Something went wrong whilst retrieving categories : ${err.message}`);
        return res.serverError();
    }
});
