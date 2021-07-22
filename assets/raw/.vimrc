set number
set expandtab
set tabstop=2
set softtabstop=2
set shiftwidth=2
syntax on
set hlsearch
let mapleader = "," 

call plug#begin('~/.vim/plugged')

Plug 'vim-airline/vim-airline'
Plug 'preservim/nerdtree'
Plug 'jistr/vim-nerdtree-tabs'
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight'
Plug 'Yggdroot/LeaderF'
Plug 'airblade/vim-gitgutter'
Plug 'tpope/vim-fugitive'
Plug 'Raimondi/delimitMate'
Plug 'tpope/vim-surround'
Plug 'tomasiser/vim-code-dark'
Plug 'ryanoasis/vim-devicons'
Plug 'godlygeek/tabular'
Plug 'plasticboy/vim-markdown'
Plug 'sheerun/vim-polyglot'

call plug#end()

" airline
let g:airline#extensions#tabline#enabled = 1
let g:airline_section_z = airline#section#create(['%l:%2v %3p%%'])
let g:airline#extensions#wordcount#enabled = 0

" NERDTree
let g:NERDTreeGitStatusUseNerdFonts = 1
let NERDTreeMinimalUI=1

" LeaderF
let g:Lf_StlSeparator = { 'left': '', 'right': '' }
let g:Lf_ReverseOrder = 1

" vim-code-dark
colorscheme codedark
let g:airline_theme = 'codedark'

" gitgutter
let g:gitgutter_override_sign_column_highlight = 0
highlight clear SignColumn
highlight GitGutterAdd ctermfg=2
highlight GitGutterChange ctermfg=3
highlight GitGutterDelete ctermfg=1
highlight GitGutterChangeDelete ctermfg=4

" delimitMate
let delimitMate_expand_cr = 1

" vim-markdown
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_toc_autofit = 1
let g:vim_markdown_math = 1
let g:vim_markdown_frontmatter = 1
let g:vim_markdown_fenced_languages = ['css', 'rb=ruby', 'javascript', 'js=javascript', 'typescript', 'ts=typescript', 'json=javascript', 'ruby', 'sass', 'xml']

" keybinding
:nnoremap <leader>h :noh<CR>
:nnoremap <leader>n :NERDTreeToggle<CR>
:nnoremap <leader>g :G<CR><C-w>100+

" nvim Terminal
:nnoremap <leader>t :call ToggleTerm("iTerm", 1)<CR>i
:tnoremap <ESC><ESC> <C-\><C-n><C-w>:call ToggleTerm("iTerm", 1)<CR>
:nnoremap <ESC><ESC> <C-\><C-n><C-w>:call ToggleTerm("iTerm", 1)<CR>i

function! ToggleTerm(termname, slider)
    let pane = bufwinnr(a:termname)
    let buf = bufexists(a:termname)
    if pane > 0
        " pane is visible
        if a:slider > 0
            :exe pane . ":hide"
        else
            :exe "e #"
        endif
    elseif buf > 0
        " buffer is not in pane
        if a:slider
            :exe "bo sp"
        endif
        :exe "buffer " . a:termname
    else
        " buffer is not loaded, create
        if a:slider
            :exe "bo sp"
        endif
        :terminal
        :exe "f " a:termname
    endif
endfunction

" Markdown Toc Toggle
function s:TocToggle()
    if index(["markdown", "qf"], &filetype) == -1
        return
    endif

    if get(getloclist(0, {'winid':0}), 'winid', 0)
        " the location window is open
        lclose
    else
        " the location window is closed
        Toc
    endif
endfunction

command TocToggle call s:TocToggle()

:nnoremap <leader>1 :TocToggle<CR>
