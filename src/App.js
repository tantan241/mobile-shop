import MainLayout from './layouts/MainLayout';
import { publicLayouts } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { PROFILE } from './constants';

function App() {
    useEffect(() => {
        window.addEventListener('beforeunload', () => {
            localStorage.removeItem(PROFILE);
        });
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicLayouts.map((publicLayout, index) => {
                        const Page = publicLayout.component;

                        return (
                            <Route
                                key={index}
                                path={publicLayout.path}
                                element={
                                    <MainLayout>
                                        <Page></Page>
                                    </MainLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
