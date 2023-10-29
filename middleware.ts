export {default} from 'next-auth/middleware';

export const config = {
    matcher : [
        '/issues/list/new',
        '/issues/edit/:id+'
    ]
}