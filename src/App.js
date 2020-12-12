// Components
import React from 'react';
import Header from './components/Header';
import Form from './components/Form';
import RecipesList from './components/RecipesList';
import Footer from './components/Footer';

// Providers
import CategoriesProvider from './context/CategoriesContext';
import RecipesProvider from './context/RecipesContext';
import ModalProvider from './context/ModalContext';

function App() {
  return (
      <CategoriesProvider>
          <RecipesProvider>
                <ModalProvider>
                    <Header />
                    
                    <div className="container my-4">
                        <div className="row">
                            <Form />
                        </div>
                        <RecipesList />
                    </div>

                    <Footer 
                        name="Franco Sparn"
                    />
                </ModalProvider>
          </RecipesProvider>
      </CategoriesProvider>
  );
}

export default App;
