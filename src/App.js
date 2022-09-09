import MainLayout from './layouts/MainLayout';
import { publicLayouts } from '~/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
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
