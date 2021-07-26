set number
set expandtab
set tabstop=2
set softtabstop=2
set shiftwidth=2
syntax on
set hlsearch
set cursorline
set clipboard+=unnamedplus " +y +p
set signcolumn=yes
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
Plug 'preservim/nerdcommenter'
Plug 'tpope/vim-surround'
Plug 'tomasiser/vim-code-dark'
Plug 'ryanoasis/vim-devicons'
Plug 'Yggdroot/indentLine'
Plug 'godlygeek/tabular'
Plug 'plasticboy/vim-markdown'
Plug 'sheerun/vim-polyglot'
Plug 'neoclide/coc.nvim', {'branch': 'release'}

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
let g:Lf_ShortcutF = '<leader>p'

let g:Lf_RgConfig = [
    \"--max-columns=150",
    \"--max-columns-preview",
    \"--glob=!*[.-]min.js",
\]

" vim-code-dark
colorscheme codedark
let g:airline_theme = 'codedark'

" devIcons
let g:DevIconsEnableFoldersOpenClose = 1

" indentLine
let g:indentLine_char = '▏'

" gitgutter
let g:gitgutter_override_sign_column_highlight = 0
highlight clear SignColumn
highlight GitGutterAdd ctermfg=2
highlight GitGutterChange ctermfg=3
highlight GitGutterDelete ctermfg=1
highlight GitGutterChangeDelete ctermfg=4

" delimitMate
let delimitMate_expand_cr = 1
let delimitMate_expand_space = 1

" nerdCommenter
let g:NERDSpaceDelims = 1

" vim-markdown
let g:vim_markdown_folding_disabled = 1
let g:vim_markdown_toc_autofit = 1
let g:vim_markdown_math = 1
let g:vim_markdown_frontmatter = 1
let g:vim_markdown_fenced_languages = ['css', 'rb=ruby', 'javascript', 'js=javascript', 'typescript', 'ts=typescript', 'json=javascript', 'ruby', 'sass', 'xml']
:hi mkdHeading ctermfg=117 cterm=bold
:hi Title ctermfg=117 cterm=bold
:hi mkdBold ctermfg=75 cterm=bold
:hi htmlBold ctermfg=75 cterm=bold
:hi mkdItalic ctermfg=240 cterm=italic,bold
:hi htmlItalic ctermfg=240 cterm=italic,bold

" Coc
inoremap <silent><expr> <TAB>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<TAB>" :
      \ coc#refresh()
inoremap <expr><S-TAB> pumvisible() ? "\<C-p>" : "\<C-h>"

function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~# '\s'
endfunction

inoremap <silent><expr> <cr> pumvisible() ? coc#_select_confirm()
    \: "\<C-g>u\<CR>\<c-r>=coc#on_enter()\<CR>"

nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

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

" keybinding
:nnoremap <silent> <leader>h :noh<CR>
:nnoremap <leader>n :NERDTreeToggle<CR>
:nnoremap <leader>f :Leaderf rg<CR>
:nnoremap <leader>g :G<CR><C-w>20+
:nnoremap <leader>1 :TocToggle<CR>
