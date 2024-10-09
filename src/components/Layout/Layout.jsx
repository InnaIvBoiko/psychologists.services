import { Suspense } from 'react';
import { RotateSpinner } from 'react-spinners-kit';
import Navigation from '../Navigation/Navigation';
import css from './Layout.module.css';

export default function Layout({children = null}) {
    return (
        <div className={css.container}>
            <Navigation />
            <Suspense fallback={<div className={css.spinner}>
                <RotateSpinner size={120} color='#54be96' />
            </div>} >
                {children}
            </Suspense>
        </div>
    );
}