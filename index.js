import task from './task.js';
import openapi from './openapi.js';

const port = process.env.PORT || 3000;
const app = express();

app.use('/api-docs', openapi);
app.use('task', task);
app.use('*',(_, res) => {
    res.redirect('/api-docs');

});

app.listen(port, () => {
    console.log(`Server inicio en el puerto ${port}`);
});

