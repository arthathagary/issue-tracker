export {default} from 'next-auth/middleware';

export const config = {
    matcher : [
        '/issues/list/new',
        '/issues/list/edit/:id+'
    ]
}