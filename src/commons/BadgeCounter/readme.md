# Description

BadgeCounter

## How To Use

**1. Import module to your component**
```node
import BadgeCounter from '@common_badgecounter';
```

**2. Use the button component**

```node
<BadgeCounter value={0}>
    {children}
</BadgeCounter>
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |
| children       | true    | component's children, can be a text or component | any |
| className       | false    | additional className for the badge counter | string |
| value       | false    | defaults to `0` | number |