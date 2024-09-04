const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('Adiciona uma tarefa (suscesso)', () => {
        const tarefa = { id: 1, descricao: 'Tarefa(suscesso)', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toContain(tarefa);
    });

    test('Erro: add tarefa, descrição curta ', () => {
        const tarefa = { id: 2, descricao: 'sos', concluida: false, data: '2024-09-04', prioridade: 1 };
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');
    });

    test('remove tarefa pelo id', () => {
        const tarefa = { id: 1, descricao: 'Tarefa para remover', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(tarefa.id);
        expect(gerenciador.buscarTarefaPorId(tarefa.id)).toBeUndefined();
    });

    test('busca tarefa pelo id', () => {
        const tarefa = { id: 3, descricao: 'Tarefa para buscar', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        const tarefaEncontrada = gerenciador.buscarTarefaPorId(3);
        expect(tarefaEncontrada).toEqual(tarefa);
    });

    test('marca tarefa concluida', () => {
        const tarefa = { id: 4, descricao: 'Tarefa para concluir', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(4);
        expect(gerenciador.buscarTarefaPorId(4).concluida).toBe(true);
    });

    test('lista tarefa concluida apenas', () => {
        const tarefa1 = { id: 5, descricao: 'Tarefa concluída', concluida: true, data: '2024-09-04', prioridade: 1 };
        const tarefa2 = { id: 6, descricao: 'Tarefa pendente', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefasConcluidas = gerenciador.listarTarefasConcluidas();
        expect(tarefasConcluidas).toEqual([tarefa1]);
    });

    test('Atualiza tarefa novo dado', () => {
        const tarefa = { id: 7, descricao: 'Tarefa para atualizar', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(7, { descricao: 'Tarefa atualizada' });
        expect(gerenciador.buscarTarefaPorId(7).descricao).toBe('Tarefa atualizada');
    });

    test('conta numero tarefa', () => {
        const tarefa1 = { id: 8, descricao: 'Tarefa 1', concluida: false, data: '2024-09-04', prioridade: 1 };
        const tarefa2 = { id: 9, descricao: 'Tarefa 2', concluida: false, data: '2024-09-04', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.contarTarefas()).toBe(2);
    });

    test('lista pela prioridade', () => {
        const tarefa1 = { id: 10, descricao: 'Tarefa alta prioridade', concluida: false, data: '2024-09-04', prioridade: 1 };
        const tarefa2 = { id: 11, descricao: 'Tarefa baixa prioridade', concluida: false, data: '2024-09-04', prioridade: 3 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefasPrioridadeAlta = gerenciador.listarTarefasPorPrioridade(1);
        expect(tarefasPrioridadeAlta).toEqual([tarefa1]);
    });

    test('adiciona tag a tarefa', () => {
        const tarefa = { id: 12, descricao: 'Tarefa com tag', concluida: false, data: '2024-09-04', prioridade: 1 };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(12, 'Urgente');
        expect(gerenciador.buscarTarefaPorId(12).tags).toContain('Urgente');
    });

    test('remove tag da tarefa', () => {
        const tarefa = { id: 13, descricao: 'Tarefa com tag para remover', concluida: false, data: '2024-09-04', prioridade: 1, tags: ['Urgente', 'Trabalho'] };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTagDaTarefa(13, 'Urgente');
        expect(gerenciador.buscarTarefaPorId(13).tags).not.toContain('Urgente');
    });

    test('lista tarefas pela data', () => {
        const tarefa1 = { id: 14, descricao: 'Tarefa para hoje', concluida: false, data: '2024-09-04', prioridade: 1 };
        const tarefa2 = { id: 15, descricao: 'Tarefa para amanhã', concluida: false, data: '2024-09-05', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        const tarefasHoje = gerenciador.buscarTarefasPorData('2024-09-04');
        expect(tarefasHoje).toEqual([tarefa1]);
    });

    test('ordena tarefas pela data', () => {
        const tarefa1 = { id: 16, descricao: 'Tarefa antiga', concluida: false, data: '2024-08-01', prioridade: 1 };
        const tarefa2 = { id: 17, descricao: 'Tarefa recente', concluida: false, data: '2024-09-01', prioridade: 2 };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        const tarefasOrdenadas = gerenciador.listarTarefas();
        expect(tarefasOrdenadas).toEqual([tarefa1, tarefa2]);
    });



    test('lista tarefas pendentes', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa pendente 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa concluída', concluida: true };
        const tarefa3 = { id: 3, descricao: 'Tarefa pendente 2', concluida: false };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3);

        const tarefasPendentes = gerenciador.listarTarefasPendentes();

        expect(tarefasPendentes).toEqual([tarefa1, tarefa3]);
    });

    test('remove tarefas concluidas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa concluída 1', concluida: true };
        const tarefa2 = { id: 2, descricao: 'Tarefa pendente', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Tarefa concluída 2', concluida: true };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3);

        gerenciador.removerTarefasConcluidas();

        expect(gerenciador.tarefas).toEqual([tarefa2]);
    });

    test('busca tarefa pela descrção', () => {
        const tarefa1 = { id: 1, descricao: 'Comprar leite', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Fazer exercícios', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Comprar pão', concluida: true };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3);

        const tarefasEncontradas = gerenciador.buscarTarefaPorDescricao('Comprar');

        expect(tarefasEncontradas).toEqual([tarefa1, tarefa3]);
    });

    test('lista tarefa pela tag', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa com tag importante', tags: ['importante'], concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa sem tag', tags: [], concluida: false };
        const tarefa3 = { id: 3, descricao: 'Tarefa com tag urgente', tags: ['urgente'], concluida: true };
        const tarefa4 = { id: 4, descricao: 'Tarefa com tag importante e urgente', tags: ['importante', 'urgente'], concluida: false };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3, tarefa4);

        const tarefasComTagImportante = gerenciador.listarTarefasPorTag('importante');

        expect(tarefasComTagImportante).toEqual([tarefa1, tarefa4]);
    });

    test('atualizar a prioridade de uma tarefa', () => {
        const tarefa = { id: 1, descricao: 'Tarefa de baixa prioridade', prioridade: 3, concluida: false };

        gerenciador.tarefas.push(tarefa);

        gerenciador.atualizarPrioridade(1, 1);

        const tarefaAtualizada = gerenciador.buscarTarefaPorId(1);

        expect(tarefaAtualizada.prioridade).toBe(1);
    });

    test('não atualiza a prioridade de uma tarefa (inexistente)', () => {
        const tarefa = { id: 1, descricao: 'Tarefa de prioridade média', prioridade: 2, concluida: false };

        gerenciador.tarefas.push(tarefa);

        gerenciador.atualizarPrioridade(2, 1);

        const tarefaNaoExistente = gerenciador.buscarTarefaPorId(2);

        expect(tarefaNaoExistente).toBeUndefined();
        expect(gerenciador.buscarTarefaPorId(1).prioridade).toBe(2); // A prioridade da tarefa original deve permanecer a mesma
    });

    test(' conta número de tarefas (por prioridade)', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa de alta prioridade', prioridade: 1, concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa de baixa prioridade', prioridade: 3, concluida: false };
        const tarefa3 = { id: 3, descricao: 'Outra tarefa de alta prioridade', prioridade: 1, concluida: true };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3);

        const countAltaPrioridade = gerenciador.contarTarefasPorPrioridade(1);
        const countBaixaPrioridade = gerenciador.contarTarefasPorPrioridade(3);

        expect(countAltaPrioridade).toBe(2);
        expect(countBaixaPrioridade).toBe(1);
    });

    test('marca todas as tarefas como concluídas', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa 1', concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa 2', concluida: false };
        const tarefa3 = { id: 3, descricao: 'Tarefa 3', concluida: false };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3);

        gerenciador.marcarTodasComoConcluidas();

        gerenciador.tarefas.forEach(tarefa => {
            expect(tarefa.concluida).toBe(true);
        });
    });

    test('reabrir uma tarefa marcada como concluída', () => {
        const tarefa = { id: 1, descricao: 'Tarefa concluída', concluida: true };

        gerenciador.tarefas.push(tarefa);

        gerenciador.reabrirTarefa(1);

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(false);
    });

    test('não reabrir uma tarefa inexistente', () => {
        const tarefa = { id: 1, descricao: 'Tarefa concluída', concluida: true };

        gerenciador.tarefas.push(tarefa);

        gerenciador.reabrirTarefa(2);

        expect(gerenciador.buscarTarefaPorId(1).concluida).toBe(true);
    });

    test('ordena as tarefas por prioridade', () => {
        const tarefa1 = { id: 1, descricao: 'Tarefa de baixa prioridade', prioridade: 3, concluida: false };
        const tarefa2 = { id: 2, descricao: 'Tarefa de alta prioridade', prioridade: 1, concluida: false };
        const tarefa3 = { id: 3, descricao: 'Tarefa de prioridade média', prioridade: 2, concluida: true };

        gerenciador.tarefas.push(tarefa1, tarefa2, tarefa3);

        gerenciador.ordenarTarefasPorPrioridade();

        expect(gerenciador.tarefas).toEqual([tarefa2, tarefa3, tarefa1]);
    });

});

