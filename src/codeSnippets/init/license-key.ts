import ScanbotSDK, {SdkConfiguration} from 'react-native-scanbot-sdk';

const configuration = new SdkConfiguration({
  licenseKey:
"Nu+ueHk1YSCs+HOyZCIU84RsTO3tvp" +
  "qpq2bSNCxiE81yciThTCYdPOmbLTPJ" +
  "2h2N8v9OPlgHqNN9cmOUvUerurKvVa" +
  "AB4racuE1OsCKxalGa5xD4EjCfRVpD" +
  "reK0mReBct9Ml0wNVrEdFwyGnnmGVq" +
  "mRqaSUxDZzFfXdNnYeICaLCRs+U/b3" +
  "GsvmbDvHjafTr8DUuezsV9yhgZ6Wck" +
  "JF0FSiyM0QsNsZrAMdEDPvp9S0I/2/" +
  "Rle8sM70LZy7UKNem6G7W5cJ58+L6y" +
  "0j7vNrmsOGg9gsjuiZPZ9gp+t9G84l" +
  "nWZY5qJuYzRoZdN7h9RgPGCX7cf/I5" +
  "BRDGLqagjzgA==\nU2NhbmJvdFNESw" +
  "psb2NhbGhvc3QKMTc4ODgyNTU5OQo4" +
  "Mzg4NjA3Cjg=\n";
});

const initResult = await ScanbotSDK.initialize(configuration);
