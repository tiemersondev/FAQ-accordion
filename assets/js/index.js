/**
 * FAQ Accordion
 *
 * Funcionalidades:
 * - Toggle de perguntas/respostas com clique (mouse)
 * - Troca dinâmica dos ícones (icon-plus.svg ↔ icon-minus.svg)
 * - Suporte completo a teclado (Enter, Space, Arrow keys, Home, End)
 * - Primeiro item já vem aberto por padrão
 * - Animação suave via CSS grid-template-rows
 */

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqButtons = document.querySelectorAll('.faq-question');

    /**
     * Fecha todos os itens do acordeão.
     * (Comportamento opcional — descomente a chamada no toggleItem
     *  se quiser que apenas um item fique aberto por vez.)
     */
    const closeAllItems = () => {
        faqItems.forEach((item) => {
            updateItemState(item, false);
        });
    };

    /**
     * Atualiza o estado visual e semântico de um item.
     * @param {HTMLElement} item - O <li> do FAQ
     * @param {boolean} open   - true para abrir, false para fechar
     */
    const updateItemState = (item, open) => {
        const button = item.querySelector('.faq-question');
        const icon = button.querySelector('.faq-icon');

        if (open) {
            item.classList.add('open');
            button.setAttribute('aria-expanded', 'true');
            if (icon) {
                icon.src = 'assets/images/icon-minus.svg';
                icon.alt = '';
            }
        } else {
            item.classList.remove('open');
            button.setAttribute('aria-expanded', 'false');
            if (icon) {
                icon.src = 'assets/images/icon-plus.svg';
                icon.alt = '';
            }
        }
    };

    /**
     * Alterna o estado de um único item.
     * @param {HTMLElement} item - O <li> do FAQ
     * @param {HTMLButtonElement} button - O botão dentro do item
     */
    const toggleItem = (item, button) => {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        updateItemState(item, !isExpanded);
    };

    // =============================================
    // Event Listeners para cada botão
    // =============================================
    faqButtons.forEach((button) => {
        // --- Clique do mouse ---
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            toggleItem(faqItem, button);
        });

        // --- Teclado: Enter e Space para toggle ---
        button.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault(); // Evita scroll com Space
                const faqItem = button.closest('.faq-item');
                toggleItem(faqItem, button);
            }
        });
    });

    // =============================================
    // Navegação por teclado entre itens
    // =============================================
    faqButtons.forEach((button, index) => {
        button.addEventListener('keydown', (event) => {
            let targetIndex = index;

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    targetIndex = (index + 1) % faqButtons.length;
                    faqButtons[targetIndex].focus();
                    break;

                case 'ArrowUp':
                    event.preventDefault();
                    targetIndex = (index - 1 + faqButtons.length) % faqButtons.length;
                    faqButtons[targetIndex].focus();
                    break;

                case 'Home':
                    event.preventDefault();
                    faqButtons[0].focus();
                    break;

                case 'End':
                    event.preventDefault();
                    faqButtons[faqButtons.length - 1].focus();
                    break;

                default:
                    break;
            }
        });
    });
});