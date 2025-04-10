## To Use Class
For example CredentialService class

Using the Default Singleton Instance
```
import credentialService from '@/services/credentialService';

// Use the default instance
const records = await credentialService.getRecords({ state: 'active' });
```

Creating a Custom Instance (if needed)
```
import { CredentialService } from '@/services/credentialService';

// Create a custom instance with different base URL
const customCredentialService = new CredentialService('/custom-credential-path');
const records = await customCredentialService.getRecords({ state: 'active' });
```