import app from './server';
import indexRouter from './routes/indexRouter';
import 'dotenv/config';

const PORT = process.env.PORT || 3002;

app.use(indexRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
