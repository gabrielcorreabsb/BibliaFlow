// Constantes
const API_BASE_URL = 'https://www.abibliadigital.com.br/api';
const BIBLE_VERSION = 'acf';
const API_TOKEN = 'SEU_TOKEN';

// Cache para armazenar capítulos já carregados
const chapterCache = new Map();

// Funções utilitárias
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function updateDateInfo() {
    const today = new Date();
    const dayOfYear = getDayOfYear(today);
    const formattedDate = formatDate(today);
    const progressPercentage = Math.round((dayOfYear / 365) * 100);

    document.getElementById('current-date').textContent = formattedDate;
    document.getElementById('current-day').textContent = dayOfYear;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;
}

// Funções de API
async function fetchWithAuth(url, retryCount = 3) {
    for (let i = 0; i < retryCount; i++) {
        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${API_TOKEN}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro na resposta:', {
                    status: response.status,
                    text: errorText,
                    attempt: i + 1
                });

                if (i === retryCount - 1) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
                continue;
            }

            return response.json();
        } catch (error) {
            if (i === retryCount - 1) {
                throw error;
            }
            console.warn(`Tentativa ${i + 1} falhou, tentando novamente...`);
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
}

async function getBibleBooks() {
    try {
        const data = await fetchWithAuth(`${API_BASE_URL}/books`);
        console.log('Livros carregados com sucesso:', data.length);
        return data.map(book => ({
            id: book.abbrev.pt,
            name: book.name,
            chapters: book.chapters,
            testament: book.testament
        }));
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        return null;
    }
}

async function fetchChapter(abbrev, chapter) {
    const cacheKey = `${abbrev}-${chapter}`;

    if (chapterCache.has(cacheKey)) {
        console.log(`Usando cache para ${cacheKey}`);
        return chapterCache.get(cacheKey);
    }

    try {
        console.log(`Buscando capítulo ${chapter} de ${abbrev}`);
        const data = await fetchWithAuth(`${API_BASE_URL}/verses/${BIBLE_VERSION}/${abbrev}/${chapter}`);

        const chapterData = {
            reference: `${data.book.name} ${data.chapter.number}`,
            content: data.verses.map(verse =>
                `<p class="verse"><sup>${verse.number}</sup> ${verse.text}</p>`
            ).join('')
        };

        chapterCache.set(cacheKey, chapterData);
        return chapterData;
    } catch (error) {
        console.error(`Erro ao buscar capítulo ${chapter} de ${abbrev}:`, error);
        throw error;
    }
}

async function getReadingForToday() {
    try {
        const books = await getBibleBooks();
        if (!books) {
            throw new Error('Não foi possível carregar os livros da Bíblia');
        }

        const today = new Date();
        const dayOfYear = getDayOfYear(today);
        const chaptersPerDay = 3;

        const readingContainer = document.getElementById('daily-reading');
        readingContainer.innerHTML = '<div class="loading">Carregando capítulos...</div>';

        let totalChaptersRead = (dayOfYear - 1) * chaptersPerDay;
        let currentBook = 0;
        let chaptersCount = 0;

        while (currentBook < books.length && chaptersCount + books[currentBook].chapters <= totalChaptersRead) {
            chaptersCount += books[currentBook].chapters;
            currentBook++;
        }

        let currentChapter = totalChaptersRead - chaptersCount + 1;
        let readingHTML = '';

        for (let i = 0; i < chaptersPerDay; i++) {
            if (currentBook < books.length) {
                try {
                    const chapterData = await fetchChapter(
                        books[currentBook].id,
                        currentChapter
                    );

                    readingHTML += `
                        <div class="chapter-content">
                            <h3 class="chapter-reference">${chapterData.reference}</h3>
                            <div>${chapterData.content}</div>
                        </div>
                    `;

                    currentChapter++;
                    if (currentChapter > books[currentBook].chapters) {
                        currentBook++;
                        currentChapter = 1;
                    }
                } catch (error) {
                    readingHTML += `
                        <div class="error">
                            Erro ao carregar o capítulo ${currentChapter} de ${books[currentBook].name}: ${error.message}
                        </div>
                    `;
                }
            }
        }

        readingContainer.innerHTML = readingHTML || '<div class="error">Erro ao carregar os capítulos</div>';
    } catch (error) {
        console.error('Erro geral:', error);
        document.getElementById('daily-reading').innerHTML =
            `<div class="error">Erro ao carregar a leitura do dia: ${error.message}</div>`;
    }
}

async function initialize() {
    try {
        console.log('Iniciando aplicativo...');
        updateDateInfo();
        await getReadingForToday();
    } catch (error) {
        console.error('Erro na inicialização:', error);
        document.getElementById('daily-reading').innerHTML =
            `<div class="error">Erro ao inicializar o aplicativo: ${error.message}</div>`;
    }
}

// Inicializar o aplicativo
initialize();