### Serving and working with Global & Local Data

#### Case 1: Serve and use global data
```html
<componentA-tag><componentA-tag>
```

#### Case 2: Create and use local data
```html
<componentA-tag><componentA-tag>
```
- declare c.data within component on main level
- ! __If__ serve is added, it'll override this local data at this level
- see Case 3, for using both.

#### Case 3: Using both local and global data
```html
<componentA-tag><componentA-tag>
```
- build + append to c.data within ( ON_SET ) function
- helpful to use a func like c.databuilder() to help here.

#### Case 4: Serving and using multiple data
```html
<componentA-tag><componentA-tag>
```

#### Case 5: Serving static (hard) data
```html
<componentA-tag><componentA-tag>
```
