import { useState, useEffect, useMemo } from "react";
import { Layout } from "./components/Layout";
import webService from "./service/webService";

const useGlobalConfig = ({
  webServiceBaseUrl,
}: {
  webServiceBaseUrl: string;
}) => {
  const ws = useMemo(() => webService(webServiceBaseUrl), []);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalConfig, setGlobalConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    setGlobalLoading(true);
    ws.getSupportedLangs()
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

interface AppProps {
  webServiceBaseUrl: string;
}

function App({ webServiceBaseUrl }: AppProps) {
  const { globalLoading, globalConfig } = useGlobalConfig({
    webServiceBaseUrl,
  });

  return (
    <>
      {globalLoading ? (
        <div>Loading Application</div>
      ) : (
        <Layout
          globalConfig={globalConfig}
          webServiceBaseUrl={webServiceBaseUrl}
        />
      )}
    </>
  );
}

export default App;
