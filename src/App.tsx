/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    </HelmetProvider>
  );
}
