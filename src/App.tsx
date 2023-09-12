import { useState, useEffect } from "react";
import { Layout } from "./components/Layout";
import webService from "./service/webService";

const useGlobalConfig = () => {
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalConfig, setGlobalConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    setGlobalLoading(true);
    webService
      .getSupportedLangs()
      .then((res) => {
        setGlobalConfig(res.data);
      })
      .finally(() => {
        setGlobalLoading(false);
      });
  }, []);

  return {
    globalLoading,
    globalConfig,
  };
};

function App() {
  const { globalLoading, globalConfig } = useGlobalConfig();

  return (
    <>
      {globalLoading ? (
        <div>Loading Application</div>
      ) : (
        <Layout globalConfig={globalConfig} />
      )}
    </>
  );
}

export default App;
